import { LibraryResponseDTO } from "./library.dto";

export class LibraryPagesDto {
    total_libraries!: number;
    total_pages!: number;
    current_page!: number;
    next_page!: number;
    previous_page!: number;
    results!: LibraryResponseDTO[];

    constructor(currentPage: number, pageSize : number, total: number, results: LibraryResponseDTO[]) {
        this.current_page = currentPage;
        this.next_page = currentPage + 1;
        this.previous_page = currentPage - 1;
        this.total_pages = Math.ceil(total / pageSize);
        this.total_libraries = total;
        this.results = results;
    }
}