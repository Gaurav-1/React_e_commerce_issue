import style from "./style.module.css"

export default function () {
    return (
        <>
            <div id="display_product"></div>

            <div class="limit">
                <label for="max">Select result count</label>
                <select name="max" id="max">
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <div id="pagination"></div>
            </div>
        </>
    )
}