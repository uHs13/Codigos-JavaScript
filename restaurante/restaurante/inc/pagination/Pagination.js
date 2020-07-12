const sql = require('./../db/db');

class Pagination {

    constructor(query, dataFormatFunc, params = [], itensPage = 10) {

        this.query = query;
        this.params = params;
        this.itensPage = itensPage;
        this.currentPage = 1;

    }
    // .constructor

    getPage(page = 1) {

        this.currentPage = page - 1;

        this.params.push(
            this.currentPage * this.itensPage,
            this.itensPage
        );

        return new Promise((res, rej) => {

            sql.query(
                [this.query, 'SELECT FOUND_ROWS() AS FOUND_ROWS'].join(';'),
                this.params,
                (err, results) => {

                    if (err) rej(err);

                    this.data = results[0];
                    this.total = results[2]['0']['FOUND_ROWS'];
                    this.totalPages = Math.ceil(this.total / this.itensPage);
                    this.currentPage++;

                    res(this.data);

                }
            );

        });

    }
    // .getPage

    getTotal() {

        return this.total;

    }
    // .getTotal

    getCurrentPage() {

        return this.currentPage;

    }
    // .getCurrentPage

    getTotalPages() {

        return this.totalPages;

    }
    // .getTotalPages

}
// .Pagination

module.exports = Pagination;