<template>
  <div class="about">
    <h1>This is an about page</h1>
    <pie-chart
      :download="true"
      :data="[
        ['Employees', 44],
        ['Doctors', 23],
      ]"
    ></pie-chart>

    <column-chart
      :download="true"
      :data="[
        ['Sun', 32],
        ['Mon', 46],
        ['Tue', 28],
      ]"
    ></column-chart>
  </div>
</template>
