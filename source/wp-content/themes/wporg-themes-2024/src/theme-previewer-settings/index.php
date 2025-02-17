<?php
/**
 * Block Name: Theme Settings
 * Description: Settings for the theme owner.
 *
 * @package wporg
 */

namespace WordPressdotorg\Theme\Theme_Directory_2024\Theme_Previewer_Settings_Block;

defined( 'WPINC' ) || die();

add_action( 'init', __NAMESPACE__ . '\init' );

/**
 * Register the block.
 */
function init() {
	register_block_type( __DIR__ . '/../../build/theme-previewer-settings' );
}
