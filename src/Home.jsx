import { useEffect, useState } from "react";
import "./App.css";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import { FaEdit } from "react-icons/fa";
import { TbTrophyOff } from "react-icons/tb";
import { BiSolidTrophy } from "react-icons/bi";
import CanvasJSReact from '@canvasjs/react-charts';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
function Home() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const moviesCollectionRef = collection(db, "movies");
  const [options,setOptions] = useState({})

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let osNo = 0 ; 
      let noOsNo = 0 ; 
      
      for(let i = 0 ; i < filteredData.length ; i++){
        if(filteredData[i].receivedAnOscar){
            osNo+=1;
        }
        else{
            noOsNo+=1;
        }
      }
      let osnop = (osNo/filteredData.length)*100;
      let noOsp = (noOsNo/filteredData.length)*100;
      setOptions({
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2", // "light1", "dark1", "dark2"
        title:{
            text: "Oscar Nominated vs Not Oscar Nominated"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",		
            startAngle: -90,
            dataPoints: [
                { y: osnop, label: "Nominated for Oscars" },
                { y: noOsp, label: "Not Nominated for Oscars" },
               
            ]
        }]
    })
      
      setMovieList(filteredData);

      
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
      setNewMovieTitle("")
      setNewReleaseDate(0)
      setIsNewMovieOscar(false)

    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
    setUpdatedTitle("")
  };

  return (
    <div style={{height:"100%",width:"100%"}} className="home-sec">
      {" "}
      <div className="home-sec-parent" style={{
        marginTop:"30px"
      }}>
        <div style={{
            width:"30vw",
            borderRadius:"20px",
            overflow:"hidden"
           
        }}>
        <CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
        </div>
    
            <div className="home-form">
        <input
          placeholder="Movie title..."
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Year..."
          type="number"
          value={Number(newReleaseDate)>0?newReleaseDate:""}
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <div style={{
            display:"flex",
            alignItems:"center",
            gap:"10px",
            color:"white"

        }}>
             <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Nominated an Oscar</label>

        </div>
       
        <button onClick={onSubmitMovie}> Submit Movie</button>
      </div>

      </div>
      
      <div className="movies-sec">
        <h1 style={{
            color:"white",
            textAlign:"center"
        }}>Movies List</h1>
        {movieList.map((movie) => (
          <div className="movie-details">
            <p style={{ 

                // color: movie.isOscarNominated ? "green" : "red" 
        }}>
              {movie.title}, {movie.releaseDate} </p>

            <RiDeleteBin7Fill color="red" style={{
                marginTop:"5px"
            }} onClick={() => deleteMovie(movie.id)}/>

            <input
              placeholder="new title..."
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
           
            <FaEdit  onClick={() => updateMovieTitle(movie.id)} />

            <p style={
                {
                    color:"white"
                }
            }>{movie.receivedAnOscar?<BiSolidTrophy/>:<TbTrophyOff/>}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
