<?php

namespace Drupal\advency_accessibility\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides an accessibility trigger Block.
 *
 * @Block(
 *   id = "advency_accessibility_trigger",
 *   admin_label = @Translation("Advency accessibility trigger"),
 *   category = @Translation("Advency accessibility trigger"),
 * )
 */
class AccessibilityTriggerBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'accessibility_trigger_block',
      '#attached' => [
        'library' => [
          'advency_accessibility/advency_accessibility'
        ],
      ],
    ];
  }
}