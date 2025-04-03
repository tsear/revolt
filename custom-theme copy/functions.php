<?php
function simple_theme_enqueue_styles() {
    wp_enqueue_style('simple-theme-style', get_stylesheet_uri());
    wp_enqueue_script(
        'rotate-words', 
        get_template_directory_uri() . '/assets/js/rotate-words.js', 
        array(), 
        '1.0', 
        true
    );
    
    // Enqueue the cat-follow script
    wp_enqueue_script(
        'cat-follow', 
        get_template_directory_uri() . '/assets/js/cat-follow.js', 
        array(), 
        '1.0', 
        true
    );
	
	wp_enqueue_script(
        'playarea-resize',
        get_template_directory_uri() . '/assets/js/playarea-resize.js',
        array(),
        '1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'simple_theme_enqueue_styles');