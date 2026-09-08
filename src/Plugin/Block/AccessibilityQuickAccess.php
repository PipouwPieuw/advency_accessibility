<?php

namespace Drupal\advency_accessibility\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides an accessibility quick access.
 *
 * @Block(
 *   id = "advency_quick_access",
 *   admin_label = @Translation("Advency quick access"),
 *   category = @Translation("Advency quick access"),
 * )
 */
class AccessibilityQuickAccess extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'accessibility_quick_access',
      '#attached' => [
        'library' => [
          'advency_accessibility/advency_accessibility'
        ],
      ],
    ];
  }
}