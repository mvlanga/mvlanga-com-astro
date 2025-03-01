export const fetchMastodonStatuses = async <T>(userId: string) => {
	const response = await fetch(
		`https://mastodon.social/api/v1/accounts/${userId}/statuses`,
	);

	console.log("RES BEFORE JSON");
	console.log(response);

	const data = await response.json();

	console.log("JSON");
	console.log(data);

	if (response.ok) {
		return data as unknown as T;
	}

	console.log("NOT OKKK");

	throw new Error(
		response.statusText ||
			"Something went wrong fetching https://mastodon.social/api/v1/accounts/:userId/statuses",
	);
};
