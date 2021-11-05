export default {
    data() {
        return {
            posts: [],
            headers: {
                id: "Id",
                title: "Title",
                description: "Description",
                status: "Status",
                create_user_id: "Create_User_Id",
                updated_user_id: "Updated_User_Id",
                deleted_user_id: "Deleted_user_id",
                deleted_at: "Deleted_at",
                created_at: "Create_at",
                updated_at: "Updated_at",
            },
        };
    },
    computed: {},
    methods: {
        /**
         * change array object to String 
         * @param {Object} array object , post data
         * @returns {String} post data
         */
        convertToCSV(objArray) {
            const array =
                typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
            let str = "";
            for (let i = 0; i < array.length; i++) {
                // eslint-disable-line
                let line = "";
                for (const index in array[i]) {
                    // eslint-disable-line
                    if (line !== "") line += ",";
                    line += array[i][index];
                }
                str += line + "\r\n"; // eslint-disable-line
            }
            return str;
        },

        /**
         * to download Post List Data as a CSV File
         * @param {Object} header CSV file Header
         * @param {String} fileTitle csv file name 
         * @returns void
         */
        exportCSVFile(headers, fileTitle) {
            if (confirm("Click 'Ok' to Download")) {
                this.$axios
                    .get("/post/download")
                    .then((data) => {
                        let items = data.data.posts;
                        if (headers) {
                            items.unshift(headers);
                        }
                        const jsonObject = JSON.stringify(items);
                        const csv = this.convertToCSV(jsonObject);
                        const exportedFilename = fileTitle + ".csv" || "export.csv"; // eslint-disable-line
                        const blob = new Blob([csv], {
                            type: "text/csv;charset=utf-8;"
                        });
                        if (navigator.msSaveBlob) {
                            // IE 10+
                            navigator.msSaveBlob(blob, exportedFilename);
                        } else {
                            const link = document.createElement("a");
                            if (link.download !== undefined) {
                                const url = URL.createObjectURL(blob);
                                link.setAttribute("href", url);
                                link.setAttribute("download", exportedFilename);
                                link.style.visibility = "hidden";
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },
    },
    mounted() {},
};