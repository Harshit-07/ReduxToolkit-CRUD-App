import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create action
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectedWithValue }) => {
    const response = await fetch(
      "https://65f932efdf1514524610b32c.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectedWithValue(error.response);
    }
  }
);

//read action
export const showUser = createAsyncThunk(
  "showUser",
  async (arg, { rejectedWithValue }) => {
    const response = await fetch(
      "https://65f932efdf1514524610b32c.mockapi.io/crud"
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectedWithValue(response.error);
    }
  }
);

//delete action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://65f932efdf1514524610b32c.mockapi.io/crud/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//edit action
export const editUser = createAsyncThunk(
  "editUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `https://65f932efdf1514524610b32c.mockapi.io/crud/${data.id}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    user: [],
    loading: false,
    error: null,
    searchInput: "",
  },
  reducers: {
    searchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },

  //!old version implementation of extraReducers
  // extraReducers: {
  //   [createUser.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [createUser.fulfilled]: (state, action) => {
  //     state.loading = false;
  //     state.users.push(action.payload);
  //   },
  //   [createUser.rejected]: (state, action) => {
  //     state.loading = false;
  //     state.users = action.payload;
  //   },
  // },

  //*New version implementation of extraReducers
  extraReducers: (builder) => {
    //create user reducer
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //read users reducer
    builder
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //delete user reducer
    builder
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.user = state.user.filter((item) => item.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(editUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.map((item) =>
          action.payload.id === item.id ? action.payload : item
        );
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetail.reducer;

export const { searchInput } = userDetail.actions;
