/**
 * Phaser event bus
 * @author songmm
 */

import { Events } from 'phaser'

// Used to emit events between components, HTML and Phaser scenes
export const eventBus = new Events.EventEmitter()
