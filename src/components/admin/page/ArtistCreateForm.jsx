import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import classNameicEditor from "@ckeditor/ckeditor5-build-classic";
import globalUrl from "../../../utils/url";

const ArtistCreateForm = () => {
  const history = useHistory();

  const token = useSelector((store) => store.user.token);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [imageErr, setImageErr] = useState("");

  const fileChangedHandler = (file) => {
    var fileInput = false;
    if (file) {
      fileInput = true;
    }
    if (fileInput) {
      const file_extension = file.name.split(".").pop().toLowerCase();
      if (file_extension === "gif") {
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
    const imageErr = {};
    let isValid = true;

    if (name.replace(/\s/g, "") === "") {
      nameErr.nameEmpty = "Ingrese un nombre";
      isValid = false;
    }

    if (description.replace(/\s/g, "") === "") {
      descriptionErr.descriptionEmpty = "Ingrese una descripción";
      isValid = false;
    }

    if (image === "" || image === undefined) {
      imageErr.imageEmpty = "Ingrese una imagen";
      isValid = false;
    } else {
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

    setNameErr(nameErr);
    setDescriptionErr(descriptionErr);
    setImageErr(imageErr);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = formValidation();
    if (isValid) {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("imageName", imageName);
      formData.append("draft", true);

      axios({
        method: "POST",
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
    }
  };

  return (
    <div className="overflow-hidden flex items-center justify-center pt-3">
      <div className="grid min-h-screen place-items-center">
        <h1 className="text-5xl uppercase italic tracking-widest">
          Nuevo artista
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
            data=""
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
