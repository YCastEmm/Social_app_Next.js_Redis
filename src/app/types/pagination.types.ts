export type PaginationType = {
	"content": [],
	"pagination": {
		"totalPages": number,
		"totalElements": number,
		"page": number,
		"size": number,
		"first": boolean,
		"last": boolean
	}
}

export type PageType<T> = {
	"content": T[],
	"pagination": PaginationType
}