import React, { useState, useEffect } from "react";
import authService from "../../services/authService";
import "./Update-account.scss";

const UpdateAccount = (userId) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updatedUserInfo, setUpdatedUserInfo] = useState({});

  const UpdateAccount = async (e) => {
    e.preventDefault();

    const updatedUserInfo = {
      name: name,
      email: email,
      password: password,
    };

    try {
      let response = await authService.updateAccountFunction(updatedUserInfo);
      setUpdatedUserInfo(response);
      return response;
    } catch (err) {}
  };

  useEffect(() => {}, [updatedUserInfo]);

  const handleDelete = async () => {
    await authService.deleteUser(userId.userId).then(() => {
      localStorage.removeItem("user");
      window.location.reload();
    });
  };

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header mb-0" id="flush-headingOne">
          <button
            className="accordion-button 
              relative
              flex
              items-center
              w-full
              py-4
              px-5
              text-base text-gray-800 text-left
              bg-gray
              border-0
              rounded-none
              transition
              focus:outline-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            <i className="fa fa-cog" aria-hidden="true"></i>{" "}
            <h2>Uppdatera konto</h2>
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse border-0 collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          {/* Message */}
          <form className="accordion-body py-4 px-5" onSubmit={UpdateAccount}>
            {updatedUserInfo && (
              <p
                className={
                  updatedUserInfo.success ? "text-green-400" : "text-red-400"
                }
              >
                {updatedUserInfo.message}
              </p>
            )}

            <input
              type="text"
              className="profile__input block w-full px-3 py-1.5 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleText0"
              placeholder="Anv??ndarnamn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="profile__input block w-full px-3 py-1.5 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleText0"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="profile__input block w-full px-3 py-1.5 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleText0"
              placeholder="L??senord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button-31"> Uppdatera</button>
          </form>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 mb-2"
          >
            Radera konto
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccount;
