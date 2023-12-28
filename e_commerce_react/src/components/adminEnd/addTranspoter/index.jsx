import style from "./style.module.css"

export default function () {

    return (
        <div id="container">
            <h2>Add Transpoter</h2>
            <div class="sub-container">
                <div class="fields">
                    <label>Name</label>
                    <label>Mail</label>
                    <label>Password</label>
                    <label for="">Type</label>
                    <label for="">City</label>
                    <label for="">City Pincode</label>
                    <label for="">State</label>
                    <label for="">Warehouse Name</label>
                </div>
                <div class="sub-container">
                    <form id="transpoter-form" name="transpoter-form" enctype="multipart/form-data" class="fields">
                        <input type="text" id="name" name="names" placeholder="Name" />
                        <input type="text" id="mail" name="mail" placeholder="example@example.com" />
                        <input type="password" id="password" name="password" placeholder="*******" />
                        <select name="type" id="type">
                            <option value="deliveryperson">Delivery Person</option>
                            <option value="city">City</option>
                            <option value="state">State</option>
                        </select>
                        <input type="text" name="city" id="city" placeholder="Transpoter City for city and deliveryperson type" />
                        <input type="number" name="pincode" id="pincode" placeholder="City pincode for city and deliveryperson type" />
                        <select name="state" id="state">
                            <option value="haryana">Haryana</option>
                        </select>
                        <input type="text" name="warehouse" id="warehouse" placeholder="Warehouse Name" />
                    </form>
                </div>
            </div>
            <div>
                <button id="add-transpoterBtn" >Add Transpoter</button>
            </div>
        </div>
    )
}