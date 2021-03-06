import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useHistory, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import classNameicEditor from "@ckeditor/ckeditor5-build-classic";
import globalUrl from "../../../utils/url";

const AlbumUpdateForm = ({ state }) => {
  const history = useHistory();
  const location = useLocation();
  const { album } = location.state;

  const token = useSelector((store) => store.user.token);
  const [artists, setArtists] = useState(null);
  const [name, setName] = useState(album.name);
  const [description, setDescription] = useState(album.description);
  const [releaseYear, setReleaseYear] = useState(album.releaseYear);
  const [artist, setArtist] = useState(album.artist);
  const [image, setImage] = useState(album.image);
  const [imageName, setImageName] = useState("");
  const [rarFile, setRarFile] = useState(album.downloadlink);
  const [draft, setDraft] = useState(album.draft);
  const [nameErr, setNameErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [releaseYearErr, setReleaseYearErr] = useState("");
  const [artistErr, setArtistErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [rarFileErr, setRarFileErr] = useState("");

  const fileChangedHandler = (file) => {
    var fileInput = false;
    if (file) {
      fileInput = true;
    }
    if (fileInput) {
      const file_extension = file.name.split(".").pop().toLowerCase();
      if (file_extension === "gif") {
        setImageName(file.name);
        setImage(file);
      } else {
        try {
          Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
              setImageName(file.name.slice(0, -4) + ".jpg");
              setImage(uri);
            },
            "blob",
            200,
            200
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const formValidation = () => {
    const nameErr = {};
    const descriptionErr = {};
    const releaseYearErr = {};
    const artistErr = {};
    const imageErr = {};
    const rarFileErr = {};
    let isValid = true;

    if (name.replace(/\s/g, "") === "") {
      nameErr.nameEmpty = "Ingrese un nombre";
      isValid = false;
    }

    if (description.replace(/\s/g, "") === "") {
      descriptionErr.descriptionEmpty = "Ingrese una descripción";
      isValid = false;
    }

    if (releaseYear === 0) {
      releaseYearErr.releaseYearEmpty = "Ingrese el año de lanzamiento";
      isValid = false;
    }

    if (artist === "") {
      artistErr.artistEmpty = "Ingrese el artista";
      isValid = false;
    }

    if (typeof image === "object" && image !== null) {
      const allowed_extensions = ["jpg", "png", "gif"];
      const file_extension = imageName.split(".").pop().toLowerCase();
      let file_ext_ok = false;

      for (let i = 0; i < allowed_extensions.length; i++) {
        if (allowed_extensions[i] === file_extension) {
          file_ext_ok = true;
        }
      }

      if (!file_ext_ok) {
        imageErr.imageType = "Ingrese un formato de archivo válido";
        isValid = false;
      }
    }

    if (typeof rarFile === "object" && image !== null) {
      const allowed_extensions = ["rar", "zip"];
      const file_extension = rarFile.name.split(".").pop().toLowerCase();
      let file_ext_ok = false;

      for (let i = 0; i < allowed_extensions.length; i++) {
        if (allowed_extensions[i] === file_extension) {
          file_ext_ok = true;
        }
      }

      if (!file_ext_ok) {
        rarFileErr.rarFileType = "Ingrese un formato de archivo válido";
        isValid = false;
      }
    }

    setNameErr(nameErr);
    setDescriptionErr(descriptionErr);
    setReleaseYearErr(releaseYearErr);
    setArtistErr(artistErr);
    setImageErr(imageErr);
    setRarFileErr(rarFileErr);
    return isValid;
  };

  useEffect(() => {
    let isMounted = true;
    let url = `${globalUrl}/api/v1/admin/artists`;
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: url,
    }).then((res) => {
      isMounted && setArtists(res.data);
    });
    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = formValidation();
    if (isValid) {
      let formData = new FormData();
      formData.append("_id", album._id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("releaseYear", releaseYear);
      formData.append("artist", artist);
      formData.append("image", image);
      formData.append("imageName", imageName);
      formData.append("file", rarFile);
      formData.append("draft", draft);

      axios({
        method: "PUT",
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
    }
  };

  return (
    <div className="overflow-hidden flex items-center justify-center pt-3">
      <div className="grid min-h-screen place-items-center">
        <h1 className="text-5xl uppercase italic tracking-widest">
          Modificar album
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
            value={name}
          />
          {Object.keys(nameErr).map((key) => {
            return (
              <div className="bg-red-200 relative text-red-500 py-1 px-3 my-3">
                {nameErr[key]}
              </div>
            );
          })}
          <label
            htmlFor="description"
            className="block my-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Descripción
          </label>
          <CKEditor
            editor={classNameicEditor}
            data={description}
            onReady={(editor) => {
              console.log(editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
            name="description"
            id="description"
          />
          {Object.keys(descriptionErr).map((key) => {
            return (
              <div className="bg-red-200 relative text-red-500 py-1 px-3 my-3">
                {descriptionErr[key]}
              </div>
            );
          })}
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
            value={releaseYear}
          />
          {Object.keys(releaseYearErr).map((key) => {
            return (
              <div className="bg-red-200 relative text-red-500 py-1 px-3 my-3">
                {releaseYearErr[key]}
              </div>
            );
          })}
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
            defaultValue={artist}
            onChange={(e) => setArtist(e.target.value)}
          >
            {artists &&
              artists.map((artist) => {
                return <option value={artist.name}>{artist.name}</option>;
              })}
          </select>
          {Object.keys(artistErr).map((key) => {
            return (
              <div className="bg-red-200 relative text-red-500 py-1 px-3 my-3">
                {artistErr[key]}
              </div>
            );
          })}
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
            onChange={(e) => fileChangedHandler(e.target.files[0])}
          />
          {Object.keys(imageErr).map((key) => {
            return (
              <div className="bg-red-200 relative text-red-500 py-1 px-3 my-3">
                {imageErr[key]}
              </div>
            );
          })}
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
            onChange={(e) => setRarFile(e.target.files[0])}
          />
          {Object.keys(rarFileErr).map((key) => {
            return (
              <div className="bg-red-200 relative text-red-500 py-1 px-3 my-3">
                {rarFileErr[key]}
              </div>
            );
          })}
          <label htmlFor="draft" className="inline-flex items-center mt-3">
            <input
              id="check"
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked={draft}
              onChange={(e) => setDraft(e.target.checked)}
            />
            <span className="ml-2 text-gray-700">Ocultar</span>
          </label>
          <button
            className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
            type="submit"
          >
            Modificar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlbumUpdateForm;
