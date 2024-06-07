/**
 * WordPress dependencies
 */
import { getContext, store } from '@wordpress/interactivity';
import { startPlaygroundWeb } from 'https://playground.wordpress.net/client/index.js'; // or '@wp-playground/client';

let playgroundClient = false;
let pendingPlaygroundUrl = false;

store( 'wporg/themes/preview', {
	state: {
		get isLoaded() {
			const context = getContext();
			return context.isLoaded;
		},
	},
	actions: {
		onLoad() {
			const context = getContext();
			context.isLoaded = true;
			wp.a11y?.speak( context.label.postNavigate, 'polite' );
		},
		navigateIframe( event ) {
			const context = getContext();
			const { selectedElement: ref } = event;
			const isSelected = 'wporg-select' === event.type;
			if ( ! ref?.dataset ) {
				return;

			context.isLoaded = false;
			if ( ref.dataset.style_variation ) {
				context.selected.style_variation = isSelected ? ref.dataset.style_variation : null;
			}
			if ( ref.dataset.pattern_name ) {
				context.selected.pattern_name = isSelected ? ref.dataset.pattern_name : null;
			}

			const params = new URLSearchParams( '' );
			if ( context.selected.style_variation ) {
				params.set( 'style_variation', context.selected.style_variation );
			}
			if ( context.selected.pattern_name ) {
				params.set( 'pattern_name', context.selected.pattern_name );
				params.set( 'page_id', 9999 );
			}

			const previewURL = new URL( context.previewBase );
			previewURL.search = params.toString();

			const permalinkURL = new URL( context.permalink );
			params.delete( 'page_id' );
			permalinkURL.search = params.toString();

			// context.url = previewURL;
			playgroundClient.goTo( '/?' + params.toString() );
			window.history.replaceState( {}, '', permalinkURL );
		},
		startPlayground() {
			const { ref } = getElement();

			startPlaygroundWeb({
				iframe: ref,
				remoteUrl: `https://playground.wordpress.net/remote.html`,

				/*
				 * TODO: Static for testing purposes.
				 * JS doesn't allow for remote blueprint urls, and can't await for fetch here.
				 */
				blueprint: {
					"preferredVersions": {
						"php": "8.0",
						"wp": "latest"
					},
					"phpExtensionBundles": [
						"kitchen-sink"
					],
					"features": {
						"networking": true
					},
					"steps": [
						{
							"step": "login",
							"username": "admin",
							"password": "password"
						},
						{
							"step": "setSiteOptions",
							"options": {
							"blogname": "Twenty Twenty-Four",
							"blogdescription": "Twenty Twenty-Four is designed to be flexible, versatile and applicable to any website."
							}
						},
						{
							"step": "installTheme",
							"themeZipFile": {
							"resource": "wordpress.org/themes",
							"slug": "twentytwentyfour"
							}
						},
						{
							"step": "runPHP",
							// NOTE: This imports starter content
							"code": "<?php namespace WordPressdotorg\\Theme_Previews\\Starter_Content; $GLOBALS['wp_filter'] = array( 'plugins_loaded' => array( 0 => array( array( 'accepted_args' => 0, 'function' => __NAMESPACE__ . '\\plugins_loaded', ), ), ), ); if ( 'cli' != php_sapi_name() ) { exit; } require '/wordpress/wp-load.php'; add_filter( 'pre_option_fresh_site', '__return_true' ); function plugins_loaded() { wp_set_current_user( 1 ); $_REQUEST['wp_customize'] = 'on'; $_REQUEST['customize_theme'] = get_stylesheet(); $_REQUEST['customize_autosaved'] = 'on'; $_GET = $_REQUEST; } global $wp_customize; if ( ! get_theme_starter_content() ) { return; } $wp_customize->import_theme_starter_content(); foreach ( $wp_customize->settings() as $setting ) { if ( 'option' !== $setting->type ) { continue; } $option_name = $setting->id_data()['base']; remove_filter( \"pre_option_{$option_name}\", array( $setting, '_preview_filter' ) ); remove_filter( \"option_{$option_name}\", array( $setting, '_multidimensional_preview_filter' ) ); remove_filter( \"default_option_{$option_name}\", array( $setting, '_multidimensional_preview_filter' ) ); } wp_publish_post( $wp_customize->changeset_post_id() ); "
						},
						// TODO: The pattern-preview plugin needs post ID 256 to exist, this needs to be created dynamically by the plugin upon load I guess.
						{
							"step": "runPHP",
							"code": "<?php require '/wordpress/wp-load.php'; wp_insert_post( [ 'import_id' => 256, 'post_title' => 'Pattern Preview', 'post_type' => 'page', 'post_status' => 'draft' ] );"
						},
						// TODO: It sucks that it takes so long to load these plugins.. I wonder if they can be inline'd somehow.
						{
							"step": "installPlugin",
							"pluginZipFile": {
							"resource": "url",
							"url": "https://raw.githubusercontent.com/dd32/wporg-theme-directory/plugins/pattern-page.zip"
							}
						},
						{
							"step": "installPlugin",
							"pluginZipFile": {
							"resource": "url",
							"url": "https://raw.githubusercontent.com/dd32/wporg-theme-directory/plugins/style-variations.zip"
							}
						}
					]
				}
			}).then( ( playground ) => {
				playgroundClient = playground;
			} );
		},
	},
} );
