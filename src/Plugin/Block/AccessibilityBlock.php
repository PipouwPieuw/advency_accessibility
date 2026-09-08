<?php

namespace Drupal\advency_accessibility\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides an accessibility options Block.
 *
 * @Block(
 *   id = "advency_accessibility",
 *   admin_label = @Translation("Advency accessibility"),
 *   category = @Translation("Advency accessibility"),
 * )
 */
class AccessibilityBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'accessibility_block',
      '#attached' => [
        'library' => [
          'advency_accessibility/advency_accessibility'
        ],
      ],
    ];
  }
}