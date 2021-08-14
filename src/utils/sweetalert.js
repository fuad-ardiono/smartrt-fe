import Swal from "sweetalert2";

export const confirmDelete = () => {
    return new Promise((resolve) => {
        Swal.fire({
            title: 'Apakah anda yakin untuk delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Batalkan'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    icon: "success",
                    confirmButtonColor: '#3085d6',
                })

                resolve(true)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Dibatalkan!",
                    icon: "success",
                    confirmButtonColor: '#3085d6',
                })
                resolve(false)
            }
        })
    })
}