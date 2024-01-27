/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import WordDetailsMenu from "../components/Words/Details/Navbar-Menu";
import CurrentWord from "../components/Words/Details/CurrentWord";
import WordSettings from "../components/Words/Details/Settings";
import axios from "axios";
import lucatch from "../assets/functions/catch";
import WordComments from "../components/Words/Details/Comments";
import WordInfo from "../components/Words/Details/Info";

const WordDetailsPage = () => {
    const page = "words";
    const slash = "/";
    const path = window.location.href.slice(window.location.href.indexOf(page) + page.length + 1);
    const [id, setID] = useState(path.slice(0, path.indexOf(slash)));
    const [content, setContent] = useState(path.slice(path.indexOf(slash) + slash.length));

    useEffect(() => {
        setID(path.slice(0, path.indexOf(slash)));
        setContent(path.slice(path.indexOf(slash) + slash.length));
    }, []);

    const [currenWord, setCurrentWord] = useState({});
    useEffect(() => {
        gets();
    }, []);

    const gets = async () => {
        await getWordInfo();
    };

    const getWordInfo = async () => {
        await axios
            .get(`${process.env.REACT_APP_URL}/otil/v1/api/word/${id}/info`, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => {
                if (!res.data.definition) res.data.definition = {};
                if (!res.data.history) res.data.history = {};
                if (!res.data.example) res.data.example = {};
                if (!res.data.synonyms) res.data.synonyms = [];
                setCurrentWord(res.data);
            })
            .catch(lucatch);
    };

    return (
        <div>
            <WordDetailsMenu id={id} page={content} setPage={setContent} />
            <CurrentWord word={currenWord} />
            {(() => {
                switch (content) {
                    case "details":
                        return <WordInfo word={currenWord} />;
                    case "comments":
                        return <WordComments word={currenWord} />;
                    case "settings":
                        return <WordSettings word={currenWord} setWord={setCurrentWord} />;

                    default:
                        return <></>;
                }
            })()}
        </div>
    );
};

export default WordDetailsPage;
