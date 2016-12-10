import React from 'react'
import axios from 'axios'
import data from './toplang-2016-12.json'
import TableStyles from './LangTable.styl';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'

function sortStringAsInt(a, b, order) {
    a = parseInt(a);
    b = parseInt(b);
    if (order === 'desc') {
        return b - a;
    } else {
        return a - b;
    }
}
function sortCountStringAsInt(a, b, order) {
    return sortStringAsInt(a.count, b.count, order);
}
function sortBytesStringAsInt(a, b, order) {
    return sortStringAsInt(a.bytes, b.bytes, order);
}

export default class LangTable extends React.Component {

    constructor() {
        super()
        this.options = {
            defaultSortName: 'count',
            defaultSortOrder: 'asc'
        };
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        axios.get(data).then(d => {
            const nonProgrammingLanguage = ['HTML', 'CSS' ,'Gettext Catalog', 'Jupyter Notebook', 'Makefile', 'TeX', 'ApacheConf', 'CMAKE', 'Groff', 'XSLT', 'CMake', 'Nginx', 'QMake', 'Yacc', 'Lex', 'Protocol Buffer', 'Batchfile', 'Smarty', 'Scilab', 'PLpgSQL', 'Perl6', 'Handlebars', 'NSIS', 'M4', 'PLSQL']
            const langranking = _.chain(d.data)
            .split('\n')
            .map(JSON.parse)
            .reject(o => _.includes(nonProgrammingLanguage, o.language_name))
            .take(50)
            .map((o, i) => _.assign(o, {id: ++i}))
            .value()
            this.setState({data: langranking});
        })
    }

    render() {
        return (
            <BootstrapTable
                condensed
                tableStyle={ { margin: '30px auto 30px auto', width: '80%' } }
                data={this.state.data}
                bordered={false}
                options={this.options}>
                <TableHeaderColumn
                    width='150'
                    dataAlign="center"
                    dataField='id'
                    isKey>
                    # Ranking
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign="center"
                    dataField='language_name'
                    >
                    Programming Language
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign="center"
                    dataField='count'
                    dataSort
                    sortFunc={ sortCountStringAsInt }>
                    Number of repository
                </TableHeaderColumn>
                <TableHeaderColumn
                    dataAlign="center"
                    dataField='bytes'
                    dataSort
                    sortFunc={ sortBytesStringAsInt }>
                    Number of bytes
                </TableHeaderColumn>
            </BootstrapTable>
        );
    }

}
