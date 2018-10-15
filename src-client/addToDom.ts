export function addToDom(guid, data) {
    document.all["guid"].innerHTML = `GUID: <strong>${guid}</strong>`;
    document.all["data"].innerHTML = `${JSON.stringify(data, undefined, 2)}`;
}