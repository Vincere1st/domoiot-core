import {MicroserviceOptions} from "@nestjs/microservices";

class MicroserviceLoader {
    private microservices: MicroserviceOptions[] = []

    addMicroservice(callback: MicroserviceOptions) {
        this.microservices.push(callback)
    }

    getMicroservices(): MicroserviceOptions[] {
        return this.microservices
    }
}
export default new MicroserviceLoader()