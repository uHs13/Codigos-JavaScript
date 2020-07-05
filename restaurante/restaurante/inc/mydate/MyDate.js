class MyDate {

    static adaptBrDatetoMysqlDate(date) {

        let date2 = date.split('/');

        return `${date2[2]}-${date2[1]}-${date2[0]}`;

    }
    // .adaptBrDatetoMysqlDate

}
// .MyDate

module.exports = MyDate;