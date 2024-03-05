import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useLoaderData, Link, Outlet, createBrowserRouter,
  RouterProvider } from "react-router-dom";
import "typeface-roboto";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FloatingActionButtons from "./floatingButtons";
import ControlledSwitches from "./controlledSwitches";

async function wordLoader({ params }) {
  const response = await fetch(
    `https://api.datamuse.com/words?rel_jja=${ params.color }`);
  const json = await response.json();
  const words = json.map(obj => obj.word);

  const r = Math.floor(Math.random() * words.length / 1);
  const word = words[r];
  
  return { color: params.color, word };
}



function Color() {
  const { color, word } = useLoaderData();

  const style = {
    padding: 100,
    textAlign: "center",
    color: "white",
    backgroundColor: color
  };

  return (
    <Paper elevation={ 10 } style={ style }>
      <Typography variant="h1">{ word.toUpperCase() }</Typography>
    </Paper>
  );
}

function ColorChooser({ defaultColors }) {
  const [moreColors, setMoreColors] = React.useState([]);
  const [inputValue, setInputValue] = React.useState([]);


  const style = {
    color: "white",
    padding: 10,
    textAlign: "center",
  };

  return (
    <Grid container spacing={ 1 }>
      <Grid item xs={3}>
        <Grid container spacing={ 1 } direction="column">
          
          { (defaultColors.concat(moreColors)).map((color, i) =>
            <Grid item key={ i }>
              <Link to={ `/colors/${ color }` } style={{ textDecoration: "none" }}>
                <Paper elevation={ 10 } style={{ ...style, backgroundColor: color }}>
                  <Typography>{ color.toUpperCase() }</Typography>
                </Paper>
              </Link>
            </Grid>
          )}
        <FloatingActionButtons />
        <input onChange={ (e) => { setInputValue(e.target.value); }}></input>
        <button onClick={ () => { setMoreColors([...moreColors, inputValue]); }}>Add a color!</button>
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

ColorChooser.defaultProps = {
  defaultColors: [ "coral", "gray", "indigo", "maroon", "navy", "olive",
            "teal", "sienna"  ] };

const router = createBrowserRouter([
  { path: "/", element: <ColorChooser />,
    children: [
      { path: "colors/:color", element: <Color />, loader: wordLoader } ]
    }
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);