<?php
/**
 * Plugin Name: Timeline-WP
 * Plugin URI:
 * Description: A simple wordpress plugin to display vertical timeline using React with hardcoded data.
 * Version: 1.0.1
 * Author: RAHB
 * Author URI: https://lab.rahb.ca
 * License : GPL-2.0
 */

//enqueue scripts and styles
function react_timeline_enqueue_scripts() {
    // Enqueue React and ReactDOM from a CDN
    wp_enqueue_script('react', 'https://unpkg.com/react@17/umd/react.production.min.js', [], '17.0.0', true);
    wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js', [], '17.0.0', true);
    // Enqueue your custom React component script
    wp_enqueue_script('react-timeline-script', plugin_dir_url(__FILE__) . 'js/timeline-app.js', ['react', 'react-dom'], '1.0.0', true);

    // Enqueue your timeline CSS styles
    wp_enqueue_style('react-timeline-style', plugin_dir_url(__FILE__) . 'css/timeline-style.css', [], '1.0.0', 'all');
}
add_action('wp_enqueue_scripts', 'react_timeline_enqueue_scripts');

function timeline_wp_shortcode() {
    return '<div id="timeline-wp"></div>';
}
add_shortcode('timeline-wp', 'timeline-wp_shortcode');
