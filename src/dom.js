import { game } from "./game";
import { markups } from "./markups";
import Player from "./player";
const dom = (() => {
  const player = new Player("Elvinas");
  const computer = new Player("AI");
  const main = document.querySelector("main");
  const init = () => {
    game.init(player, computer);
    main.insertAdjacentHTML(
      "afterbegin",
      markups.getGameboard(game.player.gameBoard, true)
    );
  };
  return { init };
})();
export { dom };
