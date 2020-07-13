const sql = require('./../db/db');

class Pagination {

    constructor(query, dataFormatFunc, params = [], itensPage = 10) {

        this.query = query;
        this.params = params;
        this.itensPage = itensPage;
        this.currentPage = 1;

    }
    // .constructor

    getPage(page = 1, dateStart = '', dateEnd = '') {

        this.currentPage = page - 1;

        this.params.push(
            this.currentPage * this.itensPage,
            this.itensPage,
            dateStart,
            dateEnd
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

    getPagination(params) {

        let limitPageNumber = 5;
        let links = [];
        let nrStart= 0;
        let nrEnd = 0;

        if (this.getTotalPages() < limitPageNumber) {

            limitPageNumber = this.getTotalPages();

        }

        // primeiras paginas
        if ((this.getCurrentPage() - parseInt(limitPageNumber / 2)) < 1) {

            nrStart = 1;

            nrEnd = limitPageNumber;

        } else if ((this.getCurrentPage() + parseInt(limitPageNumber / 2)) > this.getTotalPages()) {

            // ultimas paginas

            nrStart = this.getTotalPages() - limitPageNumber;

            nrEnd = this.getTotalPages();

        } else {

            // meio da navegacao

            nrStart = this.getCurrentPage() - parseInt(limitPageNumber / 2);

            nrEnd = this.getCurrentPage() + parseInt(limitPageNumber / 2);

        }

        for (let i = nrStart; i <= nrEnd; i++) {

            links.push({

                text: i,
                href: `?${this.getQueryString(
                    Object.assign(
                        {},
                        params,
                        {page: i}
                    )
                )}`,
                active: (i === this.getCurrentPage())

            });

        }

        return links;

    }
    // .getPagination

    getQueryString(params) {

        let queryString = [];

        for (let name in params) {

            queryString.push(`${name}=${params[name]}`);

        }

        return queryString.join('&');

    }
    // .getQueryString

}
// .Pagination

module.exports = Pagination;