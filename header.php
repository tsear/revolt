<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<header class="site-header">
  <div class="container header-inner">
    <!-- Logo -->
    <div class="logo">
      <a href="<?php echo esc_url(home_url('/')); ?>">
        <img src="https://revoltstrategies.com/wp-content/uploads/2025/03/cropped-logo-tyler2.png" alt="<?php bloginfo('name'); ?>" />
      </a>
    </div>

    <!-- Navigation -->
    <nav class="main-nav">
      <ul>
        <?php
          $pages = get_pages(['sort_column' => 'menu_order']);
          foreach ($pages as $page) {
            echo '<li><a href="' . get_page_link($page->ID) . '">' . esc_html($page->post_title) . '</a></li>';
          }
        ?>
      </ul>
    </nav>
  </div>
</header>