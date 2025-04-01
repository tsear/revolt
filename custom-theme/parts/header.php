<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php wp_title( '|', true, 'right' ); ?></title>
  <!-- This function prints all enqueued styles and scripts for the head -->
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <div class="logo-fixed">
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
      <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" alt="Revolt Logo">
    </a>
  </div>

  <header class="site-header">
    <div class="nav-inner container">
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </header>