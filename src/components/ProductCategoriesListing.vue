<template>
  <div>
    <h1>Product Categories from MySQL DB</h1>
    <table id="ptable">
      <tr v-for="productCategory in productCategories" :key="productCategory.objectId">
        <td class="left-aligned">#{{ productCategory.objectId }}</td>
        <!-- <td>&nbsp;-&nbsp;</td> -->
        <td>{{ '\u00A0-\u00A0' }}</td>
        <td :style="{ textAlign: 'right' }">{{ productCategory.name }}</td>
        <!-- <ul>
    <li v-for="productCategory in productCategories" :key="productCategory.objectId">
      {{console.log(productCategory)}}
      #{{ productCategory.objectId }} - {{ productCategory.name }}
    </li>
  </ul> -->
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductCategoriesListing',
  data() {
    return {
      productCategories: [{
        objectId: 0,
        name: '',
        isActive: 0,
        createdDate: new Date(),
        updatedDate: new Date(),
      }]
    };
  },
  mounted() {
    this.fetchProductCategories();
  },
  methods: {
    fetchProductCategories() {
      axios.get('http://localhost:3000/api/products_cat')
        .then(response => {
          console.log("response.data>> ", response.data);
          this.productCategories = response.data.map((item) => ({
            ...item,
            objectId: item.object_id,
            isActive: item.is_active,
            createdDate: new Date(item.created_date),
            updatedDate: new Date(item.updated_date)
          }))
        })
        .catch(error => {
          console.error('Error fetching product categories:', error);
        });
    }
  }
};
</script>

<style>
/* Add styles if needed */
ul {
  list-style: none;
  list-style-position: inside;
}

.left-aligned {
  text-align: left;
}

#ptable {
  margin-left: auto;
  margin-right: auto;
  width: 57pt;
    border-left-style: solid;
    border-left-width: 1pt;
    border-left-color: #013648;
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    border-bottom-color: #013648;
    border-right-style: solid;
    border-right-width: 1pt;
    border-right-color: #013648;
}
</style>
