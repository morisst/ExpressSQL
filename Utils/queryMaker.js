import config from "./config.js";

const getAllTables = () => {
    const query = `SELECT table_name FROM information_schema.tables WHERE table_schema = '${config.db.database}'`;
    return query;
};


const readQuery = (all, selectColumn, where, distinct, table) => {
    let q = "";
    if (all) {
        q = `SELECT * FROM ${table}`;
    }
    else if (selectColumn?.present) {
        q = `SELECT ${selectColumn.cols.join(", ")} from ${table}`;
    } else if (distinct?.present) {
        q = `SELECT DISTINCT ${distinct.cols.join(", ")} from ${table}`;
    }
    if (where?.present) {
        q += ` WHERE ${where.condition} `;
    }
    return q;
};



const newTableQuery = (name = "", columns = []) => {
    return `CREATE TABLE ${name} (${columns.join(", ")})`;
};



const updateTableQuery = (table, type, colName, oldColName, dataType) => {
    if (type == "add") {
        return `ALTER TABLE ${table} ADD ${colName} ${dataType}`;
    } else if (type == "rename") {
        return `ALTER TABLE ${table} RENAME COLUMN ${oldColName} to ${colName};`;
    } else if (type == "alter_type") {
        return `ALTER TABLE ${table} MODIFY COLUMN ${colName} ${dataType};`;
    } else if (type == "drop") {
        return `ALTER TABLE ${table} DROP COLUMN ${colName};`;
    }
    return "";
};



const dropTableQuery = (table) => {
    return `DROP TABLE ${table}`;
};



const insertQuery = (table, values, cols=[]) => {
    return `INSERT INTO ${table} ( ${cols.join(", ")}) VALUES(${values.join(", ")})`;
};



const updateRowQuery = (table, cols, newValues, where) => {
    let q = `UPDATE ${table} SET `;
    if (cols?.length != newValues.length) return " ";
    let tempArr = [];
    let i = 0;
    while (i < cols.length) {
        tempArr.push(`${cols[i]} = ${newValues[i]}`);
        i++;
    }
    q += tempArr.join(", ");
    return q + ` WHERE ${where}`;
};



const dropRowQuery = (table, where) => {
    return `DELETE FROM ${table} WHERE ${where};`;
};





export {
    readQuery,
    newTableQuery,
    insertQuery,
    updateTableQuery,
    dropTableQuery,
    updateRowQuery,
    dropRowQuery,
    getAllTables
};