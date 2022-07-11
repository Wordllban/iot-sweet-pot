import { Test, TestingModule } from "@nestjs/testing";
import { PotController } from "./pot.controller";
import { PotService } from "./pot.service";

describe("PotController", () => {
  let controller: PotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PotController],
      providers: [PotService],
    }).compile();

    controller = module.get<PotController>(PotController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
