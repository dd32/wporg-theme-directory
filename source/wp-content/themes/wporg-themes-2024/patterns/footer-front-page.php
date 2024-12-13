<?php
/**
 * Title: Front Page Footer
 * Slug: wporg-themes-2024/footer-front-page
 * Inserter: no
 */

?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"right":"var:preset|spacing|edge-space","left":"var:preset|spacing|edge-space","top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}},"border":{"bottom":{"color":"var:preset|color|white-opacity-15","style":"solid","width":"1px"}},"elements":{"link":{"color":{"text":"var:preset|color|blueberry-2"}}}},"backgroundColor":"charcoal-2","textColor":"white","className":"wporg-front-page-footer","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull wporg-front-page-footer has-white-color has-charcoal-2-background-color has-text-color has-background has-link-color" style="border-bottom-color:var(--wp--preset--color--white-opacity-15);border-bottom-style:solid;border-bottom-width:1px;padding-top:var(--wp--preset--spacing--40);padding-right:var(--wp--preset--spacing--edge-space);padding-bottom:var(--wp--preset--spacing--40);padding-left:var(--wp--preset--spacing--edge-space)">
	<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|20","left":"var:preset|spacing|40"}}}} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"verticalAlignment":"top","width":"33.34%","layout":{"inherit":false}} -->
		<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:33.34%">
			<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"600","lineHeight":"1.3"}},"fontSize":"large","fontFamily":"inter"} -->
			<h2 class="wp-block-heading has-inter-font-family has-large-font-size" style="font-style:normal;font-weight:600;line-height:1.3"><?php esc_html_e( 'Add your theme', 'wporg-themes' ); ?></h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"is-style-short-text"} -->
			<p class="is-style-short-text">
				<?php
				echo wp_kses_post(
					sprintf(
						// translators: %s: URL for theme submission page.
						__( 'The WordPress theme directory is used by millions of WordPress users all over the world. <a href="%s">Submit your theme</a> to the official WordPress.org theme repository.', 'wporg-themes' ),
						esc_url( site_url( '/getting-started/' ) )
					)
				);
				?>
			</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"33.34%","layout":{"inherit":false}} -->
		<div class="wp-block-column" style="flex-basis:33.34%">
			<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"600","lineHeight":"1.3"}},"fontSize":"large","fontFamily":"inter"} -->
			<h2 class="wp-block-heading has-inter-font-family has-large-font-size" style="font-style:normal;font-weight:600;line-height:1.3"><?php esc_html_e( 'Create a theme', 'wporg-themes' ); ?></h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"is-style-short-text"} -->
			<p class="is-style-short-text">
				<?php
				echo wp_kses_post(
					sprintf(
						// translators: %s URL to theme handbook.
						__( 'Want to learn how to build a great theme? Read the <a href="%s">Theme Developer Handbook</a> to learn everything about WordPress theme development.', 'wporg-themes' ),
						'https://developer.wordpress.org/themes/'
					)
				);
				?>
			</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"33.33%"} -->
		<div class="wp-block-column" style="flex-basis:33.33%">
			<!-- wp:heading {"style":{"typography":{"fontStyle":"normal","fontWeight":"600","lineHeight":"1.3"}},"fontSize":"large","fontFamily":"inter"} -->
			<h2 class="wp-block-heading has-inter-font-family has-large-font-size" style="font-style:normal;font-weight:600;line-height:1.3"><?php esc_html_e( 'Stay up-to-date', 'wporg-themes' ); ?></h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"is-style-short-text"} -->
			<p class="is-style-short-text">
				<?php
				echo wp_kses_post(
					sprintf(
						// translators: %s URL to themes team make blog.
						__( 'Trying to ensure a great experience for the theme authors and users, means that theme requirements change from time to time. Keep up with the latest changes by following the <a href="%s">Themes Team blog</a>.', 'wporg-themes' ),
						'https://make.wordpress.org/themes/'
					)
				);
				?>
			</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
