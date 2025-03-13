import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Star from "../../Components/Star/Star";
import ListKOL from "../../Components/ListKOL/ListKOL";

function Home() {
  // copy the address to clipboard
  const copyAddress = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText("726....589");
    document.getElementById("addr4cpy").innerHTML = "Copied!";
    setTimeout(() => {
      document.getElementById("addr4cpy").innerHTML = "726....589";
    }, 1000);
  };
  const KOLlist = [
    {
      avatar: "https://picsum.photos/200/300",
      name: "John Doe",
      address: "726....589",
      roi: "110%",
      pnl: "+1k Sol",
      cooker: "50",
      farmer: "10",
      review: "5"
    },
    {
      avatar: "https://picsum.photos/200/300",
      name: "John Doe",
      address: "726....589",
      roi: "110%",
      pnl: "+1k Sol",
      cooker: "50",
      farmer: "10",
      review: "5"
    },
    {
      avatar: "https://picsum.photos/200/300",
      name: "John Doe",
      address: "726....589",
      roi: "110%",
      pnl: "+1k Sol",
      cooker: "50",
      farmer: "10",
      review: "5"
    },

  ]
  return (
    <div id="bodyWrapper">
      <Navbar />

      <div className="container">
        <Link id="King">
          <img src="/king.png" alt="KING" id="KingIcon" />

          <img src="/kingKOL.png" alt="KING OF KOLS" id="KingImg" />

          <div id="KingInfo">
            <p id="KingName">Name</p>
            <p id="KingAddr" onClick={(e) => copyAddress(e)}>
              <span id="addr4cpy">726....589</span>
              <img src="content_copy.svg" alt="copy" />
            </p>
            <p id="verificationText">Verified KOL</p>
          </div>

          <div className="KingStats">
            <p>
              ROI: <span>110%</span>
            </p>
            <p>
              PnL: <span>+1k Sol</span>
            </p>
          </div>

          <div className="KingStats">
            <p>
              Upvotes: <strong>50</strong>
            </p>
            <p>
              Reviews: <strong>10</strong>
            </p>
          </div>
        </Link>
        <div id="starContainer">
          <div id="starHeader" />
          <div id="starBody">
            <Star name="XYZ" roi="11.2k%" pnl="+9.5 Sol" />
            <Star name="XYZ" roi="11.2k%" pnl="+9.5 Sol" />
            <Star name="XYZ" roi="11.2k%" pnl="+9.5 Sol" />
            <Star name="XYZ" roi="11.2k%" pnl="+9.5 Sol" />
          </div>
        </div>
        <ListKOL KOLlist={KOLlist}/>
      </div>
    </div>
  );
}

export default Home;
