<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php wp_title('|', true, 'right'); ?></title>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <header class="site-header">
    <div class="nav-inner container">
      <!-- Site Logo on the Left -->
      <div class="logo">
        <a href="<?php echo esc_url( home_url( 'assets/logo-tyler.png' ) ); ?>">
          <img class="site-logo" src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-tyler.png" alt="Site Logo">
        </a>
      </div>
      <!-- Navigation Menu on the Right -->
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </header>