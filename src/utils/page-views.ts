export const enrichPageViewIdWithHostnameInfo = (
	id: string,
	hostname: string,
) => {
	return `${hostname}/${id}`;
};

export const removeHostnameInfoFromPageViewId = (
	id: string,
	hostname: string,
) => {
	return id.replace(`${hostname}/`, "");
};
