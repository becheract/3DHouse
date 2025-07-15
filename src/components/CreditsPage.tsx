import react from "react"
import { useNavigate } from "react-router";
import './CreditsPage.css';

const creditPage = () => {
  let navigate = useNavigate();

  const GoBackPage = () => {
    navigate("/");
  };
  return (
    <div className="credits">
      <h1> PS1 models used </h1>
      <ul>
        <div className="credit_container">
          <div className="credits">
            floppy disk
          </div>
          <div className="credits">
            https://sketchfab.com/3d-models/low-poly-90s-electronics-assets-dbec953851674556a7315f22d70106d7
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            plants
            <br />
            monitor
            <br />
            paintings
            <br />
            magazines
            <br />
            radio
          </div>
          <div className="credits">
            https://elbolilloduro.itch.io/paquete-de-modelos-psx-3
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            table
            <br />
            tv
            <br />
            computer chair
          </div>
          <div className="credits">
            https://elbolilloduro.itch.io/paquete-de-modelos-low-poly-estilo-psx-2
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            ps1 arms
          </div>
          <div className="credits">
            https://sketchfab.com/3d-models/psx-first-person-arms-efd731f559a14ab48e29c8a200d71788
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            Backpack
          </div>
          <div className="credits">
            https://elbolilloduro.itch.io/survival-psx
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            shopping cart
          </div>
          <div className="credits">
            https://sketchfab.com/3d-models/psx-low-poly-shopping-cart-d64b194a1f2c4715b334bde8d3b267ca
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            mousepad
            <br />
            mouse
          </div>
          <div className="credits">
            https://sketchfab.com/3d-models/pc-in-ps1-style-ps1-825e9f732fad420eae9e2795035ddf0c
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            police car
          </div>
          <div className="credits">
            https://ggbot.itch.io/psx-style-cars
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            bike
          </div>
          <div className="credits">
            https://sulphur-matrix.itch.io/psx-bicylcle
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            bookshelf
            <br />
            ceiling fan
            <br />
            bed
            <br />
            Fan
            <br />
            trash bag
            <br />
            display shelf
          </div>
          <div className="credits">
            https://sketchfab.com/3d-models/objects-interiorvillage-alpha-c640f60b970a48648a158c91c1c45b2b
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            Shelf
          </div>
          <div className="credits">
            https://sketchfab.com/3d-models/low-poly-office-cubicle-assets-f430770d9ba5480a89b3e355d05f9385
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            Sofa
          </div>
          <div className="credits">
            https://sketchfab.com/3d-models/armchair-675cc978e5d74bcea7ef28d13a63a3da
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            Videos
          </div>
          <div className="credits">
            https://www.youtube.com/watch?v=vsRA5BG3N8E&t=109s
          </div>
        </div>

        <div className="credit_container">
          <div className="credits">
            Assets made by me
            <br />
            mario kart
            <br />
            fallout new vegas
            <br />
            skyrim
            <br />
            fanshawe
            <br />
            desktop
            <br />
            arduino
            <br />
            paint brush
            <br />
            phone
          </div>
        </div>
      </ul>
      <button onClick={GoBackPage}>Go Back</button>
    </div>
  );
};

export default creditPage;