import { configureStore } from "@reduxjs/toolkit";
import createUserReducer from "./slice/CreateUserSlice";
import loginReducer from "./slice/LoginUserSlice";
import createArchitectReducer from "./slice/CreateContentSlice";
import fetchArchitectsDataReducer from "./slice/ArchtectDataSlice";
import fetchAstrologerDataReducer from "./slice/AstrologerDataSlice";
import fetchUserDataReducer from "./slice/UserDataSlice";
import fetchImageUploadReducer from "./slice/ImageUploadSlice";
import fetchUploadedImageDataReducer from "./slice/UploadedImageDataSlice";
import deleteArchitectReducer from "./slice/DeleteArchitectSlice";
import deleteAstrolgerReducer from "./slice/DeleteAstrologerSlice";
import createOrderReducer from "./slice/CreateOrderSlice";
import fetchOrderDataReduer from "./slice/OrderDataSlice";
import deleteUserReducer from "./slice/DeleteUserSlice";
import enquiryReducer from "./slice/EnquirySlice";
import enquiryDatareducer from "./slice/GetEnquirySlice";

export const store = configureStore({
  reducer: {
    createuser: createUserReducer,
    loginuser: loginReducer,
    createarchitect: createArchitectReducer,
    architectdata: fetchArchitectsDataReducer,
    astrologerdata: fetchAstrologerDataReducer,
    usersData: fetchUserDataReducer,
    imageUpload: fetchImageUploadReducer,
    uploadImageData: fetchUploadedImageDataReducer,
    deleteArchitect: deleteArchitectReducer,
    deleteAstrolger: deleteAstrolgerReducer,
    createOrder: createOrderReducer,
    orderData: fetchOrderDataReduer,
    deleteUser: deleteUserReducer,
    enquiryData: enquiryReducer,
    getEnquiryData: enquiryDatareducer,
  },
});
