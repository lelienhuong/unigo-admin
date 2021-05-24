<template>
  <div class="qrcode">
    <h1 style="text-align: center; color: rgba(11, 102, 191, 1)">
      QRCode Generator
    </h1>
    <ul>
      <li><a href="#Room">Room</a></li>
      <li><a href="#Building">Building</a></li>
      <li><a href="#Places">Places</a></li>
    </ul>
    <div v-for="(typeObject, index) in typeObjectsArray" :key="index">
      <h2
        :id="typeObject.title"
        style="margin: 2rem 0 2rem 2rem; color: rgba(11, 102, 191, 1)"
      >
        {{ typeObject.title }}
      </h2>
      <div class="qrcode--container">
          <!-- eslint-disable -->
        <div v-for="(item, index) in qrcodeArray"  v-if="item.typeObject == typeObject.id" :key="index" class="output">
            <div style="width: 200px">
              <p
                v-if="item.name != '' && item.name != null"
                style="
                  text-align: center;
                  margin-bottom: 25px;
                  font-weight: bolder;
                  font-size: 20px;
                "
              >
                {{ item.name }}
              </p>
              <p
                v-else
                style="
                  text-align: center;
                  margin-bottom: 25px;
                  font-weight: bolder;
                  font-size: 20px;
                "
              >
                {{ item.nameTag }}
              </p>
              <img :src="item.src" alt="QRCode" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { schoolService } from "@/services/school";
import { buildingService } from "@/services/building";
export default {
  name: "QRcodesIndex",
  data() {
    return {
      title: "Gerador QRCode",
      qrcode: new QRious({ size: 200 }),
      qrcodeArray: [],
      placesData: [],
      buildingData: [],
      roomsData: [],
      dataLink: [],
      typeObjectsArray: [
        { id: 1, title: "Room" },
        { id: 2, title: "Building" },
        { id: 3, title: "Places" },
      ],
      query: {
        page: 1,
        limit: 10,
      },
    };
  },
  async created() {
    var responsePLacesData = await schoolService.getAllPlaces();
    this.placesData = responsePLacesData.data
    var responseBuildingData = await buildingService.getAllBuildings();
    this.buildingData = responseBuildingData.data
    this.placesData.forEach((item) => {
      this.dataLink.push({
        link: "dsc://unigo.pro/@3," + item.id,
        name: item.name,
        nameTag: item.nameTag,
      });
    });
    this.buildingData.forEach((item) => {
      this.dataLink.push({
        link: "dsc://unigo.pro/@2," + item.id,
        name: item.name,
        nameTag: item.nameTag,
      });
      item.floors.forEach((floor) => {
        floor.rooms.forEach((room) => {
          this.dataLink.push({
            link: "dsc://unigo.pro/@1," + room.id,
            name: room.name,
            nameTag: room.nameTag,
          });
        });
      });
    });

    // alert(this.placesData)
    this.dataLink.forEach((item) => {
      const data = this.newQRCode(item.link);
      const typeObject = this.validateToGetType(item.link);
      this.qrcodeArray.push({
        baseLink: item.link,
        src: data,
        typeObject: typeObject,
        name: item.name,
        nameTag: item.nameTag,
      });
    });
  },
  methods: {
    newQRCode(itemLink) {
      this.qrcode.value = "";
      this.qrcode.value = itemLink;
      return this.qrcode.toDataURL();
    },
    validateToGetType(link) {
      var validatedArray = link.split("@");
      return validatedArray[1].charAt(0);
    },
  },
};
</script>

<style>
</style>