export const fetchMastodonStatuses = async <T>(userId: string) => {
	const response = await fetch(
		`https://mastodon.social/api/v1/accounts/${userId}/statuses`,
	);

	const data = await response.json();

	if (response.ok) {
		return data as unknown as T;
	}

	throw new Error(
		response.statusText ||
			"Something went wrong fetching https://mastodon.social/api/v1/accounts/:userId/statuses",
	);
};
