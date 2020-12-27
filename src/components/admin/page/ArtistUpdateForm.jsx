import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import classNameicEditor from "@ckeditor/ckeditor5-build-classic";
import globalUrl from "../../../utils/url";

const ArtistUpdateForm = ({ state }) => {
  const history = useHistory();
  const location = useLocation();
  const { artist } = location.state;

  const token = useSelector((store) => store.user.token);
  const [name, setName] = useState(artist.name);
  const [description, setDescription] = useState(artist.description);
  const [draft, setDraft] = useState(artist.draft);

  const handleSubmit = (e) => {
    e.preventDefault();
    let img = document.querySelector("#imageFile");
    let imageToSend = img.files[0];

    let formData = new FormData();
    formData.append("id", artist._id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", imageToSend);
    formData.append("draft", draft);

    axios({
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      url: `${globalUrl}/api/v1/admin/artists`,
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
          Modificar artista
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
              console.log("Editor is ready to use!");
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
            name="description"
            id="description"
          />
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

export default ArtistUpdateForm;
