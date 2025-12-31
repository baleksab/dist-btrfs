import { Stack } from "@mantine/core";
import { useState } from "react";
import { SecondaryServerSelector } from "../SecondaryServerSelector";
import { SubvolumeSelector } from "../SubvolumeSelector";

export const IncrementalReplicationForm = () => {
  const [selectedSecondaryServer, setSelectedSecondaryServer] = useState<string>();
  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>();

  return (
    <Stack>
      <SecondaryServerSelector
        type="single"
        onChange={(event) => setSelectedSecondaryServer(event?.[0])}
        value={selectedSecondaryServer ? [selectedSecondaryServer] : []}
      />
      {selectedSecondaryServer && (
        <SubvolumeSelector
          serverUid={selectedSecondaryServer}
          value={selectedSubvolume}
          onChange={setSelectedSubvolume}
        />
      )}
    </Stack>
  );
};
