import { CardType } from 'common/entities/CardsList/CardsListResponse';

// TODO: remove this file
export function getMockData() {
	const mockData: CardType = {
		cardTypeTitle: 'باران',
		cardPatternItems: [
			{
				cardPatternId: 2,
				title: 'Baran Red',
				titleKey: 'BaranRed',
				color: 'Red',
				picsAddress:
					'https://s3-alpha-sig.figma.com/img/946e/2f62/31fee1050ce532c45d49121fc1c8f49f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pwjR58qnSfTd3W3en4zmY1YLsENu0Kyw2-clY2YmU3ZS3E9jo1jecCvGESlwq4yKlQUbU~IQycPiEpWWfjk6gkroZEd0ALK~b3saMtNTmgZt98VcxAumt2Y-4~v1SH0TKOT8lDOrJiyxWmZLR7pDKb9ZRqa~YitH82lcGOolKMuiATwACB4vyVU-rBy5WYwnHLPe-k~kPG4UvwqbzYvBOOHtxpSsUyWhICa3DtzmIH8POYHvrfgjznjc~NZ0SKn94~speuOSNlokzP9A5vIbxTPuRPwBEwAQJIQ9M4gd1JtG8KDIxBQejAOoBrMkx-b4j1~7Maq0u1afFfPoeHUZ3g__',
				issuanceAmount: 2000.0,
				hasIdentifier: true,
				identifierKey: 'NationalCode'
			},
			{
				cardPatternId: 4,
				title: 'Baran Blue',
				titleKey: 'BaranBlue',
				color: 'Blue',
				picsAddress:
					'https://s3-alpha-sig.figma.com/img/816f/c77f/48673f7b273d3e90e6efdff1d9ca87f0?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AAx-E~V7cdz5iDOzk9Vda7dKxCUTkdIVYIYlXlcaxIsgG316HQ9niVRQQQCWR-plxgkKiRi4NxM0IOtp23uNQ7Oy5BciiSjIZHkyIKtWf~pJ4FSvWvIgJgWN14sQawchHu~W82Sm-nMaNf2y6Dvn8tXd3-P5lO45hxzqgpmIQ5uQiGB0eR1-GKaJ5qh5HSkM2F06ML8iiSB9Xaphx9PPGRqH-d6hwKxSPaAg4fRnRPkyRMJ2XDOj~fSkbHEHRFx1exURmrNGxnymJEQd7AKXzY7y2GTnQKRTfqEuhUrNzh3BW~NfHAs4-Mzzr548WJd-9VmCk-LVzNNiD52DU56HrQ__',
				issuanceAmount: 6000.0,
				hasIdentifier: false,
				identifierKey: ''
			},
			{
				cardPatternId: 3,
				title: 'Mhr77 Blue',
				titleKey: 'Mhr77Blue',
				color: 'Blue',
				picsAddress:
					'https://s3-alpha-sig.figma.com/img/946e/2f62/31fee1050ce532c45d49121fc1c8f49f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pwjR58qnSfTd3W3en4zmY1YLsENu0Kyw2-clY2YmU3ZS3E9jo1jecCvGESlwq4yKlQUbU~IQycPiEpWWfjk6gkroZEd0ALK~b3saMtNTmgZt98VcxAumt2Y-4~v1SH0TKOT8lDOrJiyxWmZLR7pDKb9ZRqa~YitH82lcGOolKMuiATwACB4vyVU-rBy5WYwnHLPe-k~kPG4UvwqbzYvBOOHtxpSsUyWhICa3DtzmIH8POYHvrfgjznjc~NZ0SKn94~speuOSNlokzP9A5vIbxTPuRPwBEwAQJIQ9M4gd1JtG8KDIxBQejAOoBrMkx-b4j1~7Maq0u1afFfPoeHUZ3g__',
				issuanceAmount: 5000.0,
				hasIdentifier: false,
				identifierKey: ''
			},
			{
				cardPatternId: 1,
				title: 'Mehr Red',
				titleKey: 'MehrRed',
				color: 'Red',
				picsAddress:
					'https://s3-alpha-sig.figma.com/img/946e/2f62/31fee1050ce532c45d49121fc1c8f49f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pwjR58qnSfTd3W3en4zmY1YLsENu0Kyw2-clY2YmU3ZS3E9jo1jecCvGESlwq4yKlQUbU~IQycPiEpWWfjk6gkroZEd0ALK~b3saMtNTmgZt98VcxAumt2Y-4~v1SH0TKOT8lDOrJiyxWmZLR7pDKb9ZRqa~YitH82lcGOolKMuiATwACB4vyVU-rBy5WYwnHLPe-k~kPG4UvwqbzYvBOOHtxpSsUyWhICa3DtzmIH8POYHvrfgjznjc~NZ0SKn94~speuOSNlokzP9A5vIbxTPuRPwBEwAQJIQ9M4gd1JtG8KDIxBQejAOoBrMkx-b4j1~7Maq0u1afFfPoeHUZ3g__',
				issuanceAmount: 2000.0,
				hasIdentifier: true,
				identifierKey: 'NationalCode'
			}
		]
	};
	return mockData;
}
