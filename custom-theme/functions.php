
<?php
function revolt_enqueue_assets() {
    wp_enqueue_style('theme-style', get_template_directory_uri() . '/style.css', [], time());

    wp_enqueue_script('cat-follow', get_template_directory_uri() . '/assets/js/cat-follow.js', [], false, true);
}
add_action('wp_enqueue_scripts', 'revolt_enqueue_assets');