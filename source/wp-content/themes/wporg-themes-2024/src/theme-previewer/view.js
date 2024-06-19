/**
 * WordPress dependencies
 */
import { getContext, getElement, store } from '@wordpress/interactivity';
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
			}

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
			pendingPlaygroundUrl = '/?' + params.toString();
			if ( playgroundClient ) {
				playgroundClient.goTo( pendingPlaygroundUrl ).then( () => context.isLoaded = false );
			}
			window.history.replaceState( {}, '', permalinkURL );
		},
		startPlayground() {
			const context = getContext();
			const { ref } = getElement();

			// Set it as immediately loaded..
			context.isLoaded = true;

			fetch( 'https://wordpress.org/themes/wp-json/themes/v1/preview-blueprint/' + context.theme )
			.then( ( response ) => response.json() )
			.then( ( blueprint ) => {
				startPlaygroundWeb({
					iframe: ref,
					remoteUrl: `https://playground.wordpress.net/remote.html`,
					blueprint: blueprint
				}).then( ( playground ) => {
					playgroundClient = playground;
					if ( pendingPlaygroundUrl ) {
						playgroundClient.goTo( pendingPlaygroundUrl ).then( () => context.isLoaded = false );
					}
				});
			} );
		},
	},
} );
