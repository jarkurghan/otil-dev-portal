const convertTB = (text) => text.trim().replaceAll("'", "‘").replaceAll("ʻ", "‘").replaceAll("ʼ", "‘").replaceAll("‘", "‘").replaceAll("’", "‘");

const convert = (word) => {
    if (!word.example.example) delete word.example.example;
    if (!word.example.resource) delete word.example.resource;
    if (!word.example.page) delete word.example.page;
    if (!word.definition.definition) delete word.definition.definition;
    if (!word.definition.resource) delete word.definition.resource;
    if (!word.definition.page) delete word.definition.page;
    if (!word.history.history) delete word.history.history;
    if (!word.history.resource) delete word.history.resource;
    if (!word.history.page) delete word.history.page;
    delete word.synonyms_text;

    if (typeof word.word === "string") word.word = convertTB(word.word);
    if (typeof word.definition.definition === "string") word.definition.definition = convertTB(word.definition.definition);
    if (typeof word.example.example === "string") word.example.example = convertTB(word.example.example);
    if (typeof word.history.history === "string") word.history.history = convertTB(word.history.history);
    for (let i = 0; i < word.synonyms.length; i++) word.synonyms[i] = convertTB(word.synonyms[i]);

    return word;
};

export default convert;
