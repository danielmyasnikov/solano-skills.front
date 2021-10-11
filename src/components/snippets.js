import { setCompleters } from "ace-builds/src-noconflict/ext-language_tools";

const snippets = () => {
  useEffect(() => {
    const completer = {
      getCompletions: function (editor, session, pos, prefix, callback) {
        var completions = [
          {
            caption: "read_csv",
            snippet: `read_csv`,
            type: "snippet",
          },
        ];

        /* You Can get to know how to add more cool 
        autocomplete features by seeing the ext-language-tools 
        file in the ace-buils folder */

        completions.forEach((i) => {
          completions.push({
            caption: i.caption,
            snippet: i.snippet,
            type: i.type,
          });
        });
        callback(null, completions);
      },
    };
    setCompleters([completer]);
  }, []);
};

export default snippets;
