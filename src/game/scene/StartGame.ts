import Phaser, { AUTO, Game } from 'phaser'
import { MainMenu } from './MainMenu.ts'
import { Boot } from './Boot'
import { Preloader } from './Preloader.ts'
import { Game as MainGame } from './Game.ts'
import { GameOver } from './GameOver.ts'

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver]
}

const StartGame = (parent: string) => {
  return new Game({ ...config, parent })
}

export default StartGame
