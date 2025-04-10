export type StrapiPaginationType = {
	"content": [],
	"pagination": {
		"page": number,
		"pageSize": number,
		"pageCount": number,
		"total": number,
	}
}

export type StrapiResultType<T> = {
	"data": T[],
	"meta": StrapiPaginationType
}
