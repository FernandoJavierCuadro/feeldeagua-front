import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import classNameicEditor from "@ckeditor/ckeditor5-build-classic";
import globalUrl from "../../../utils/url";

const ArtistCreateForm = () => {
  const token = useSelector((store) => store.user.token);
  const [artists, setArtists] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [artist, setArtist] = useState(0);
  const [draft, setDraft] = useState(false);

  const history = useHistory();

  useEffect(() => {
    let url = `${globalUrl}/api/v1/admin/artists`;
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: url,
    }).then((res) => {
      setArtists(res.data);
    });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let img = document.querySelector("#imageFile");
    let imageToSend = img.files[0];

    let file = document.querySelector("#rarFile");
    let fileToSend = file.files[0];

    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("releaseYear", releaseYear);
    formData.append("artist", artist);
    formData.append("image", imageToSend);
    formData.append("file", fileToSend);
    formData.append("draft", draft);

    axios({
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      url: `${globalUrl}/api/v1/admin/albums`,
      data: formData,
    })
      .then((res) => {
        history.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="overflow-hidden flex items-center justify-center pt-3">
      <div className="grid min-h-screen place-items-center">
        <h1 className="text-5xl uppercase italic tracking-widest">
          Nuevo album
        </h1>
        <form id="form" className="" onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Nombre
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            name="name"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            id="name"
            type="text"
          />
          <label
            htmlFor="description"
            className="block my-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Descripción
          </label>
          <CKEditor
            editor={classNameicEditor}
            data=""
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
            name="description"
            id="description"
          />
          <label
            htmlFor="name"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Año
          </label>
          <input
            onChange={(e) => setReleaseYear(e.target.value)}
            name="releaseYear"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            id="releaseYear"
            type="number"
          />
          <label
            htmlFor="artist"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Artista
          </label>
          <select
            name="artist"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            id="artist"
            value={artist._id}
            onChange={(e) => setArtist(e.target.value)}
          >
            <option disabled selected value="">
              Seleccione un artista
            </option>
            {artists &&
              artists.map((artist) => {
                return <option value={artist._id}>{artist.name}</option>;
              })}
          </select>
          <label
            htmlFor="imageFile"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Imagen
          </label>
          <input
            name="imageFile"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            id="imageFile"
            type="file"
          />
          <label
            htmlFor="rarFile"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Archivo
          </label>
          <input
            name="rarFile"
            className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            id="rarFile"
            type="file"
          />
          <label htmlFor="draft" className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              onChange={(e) => setDraft(e.target.checked)}
            />
            <span className="ml-2 text-gray-700">Ocultar</span>
          </label>
          <button
            className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            type="submit"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArtistCreateForm;
