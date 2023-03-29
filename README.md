# Parsing Varints

### parseBIG
Expects a Uint8Array and returns the first varint parsed

## parse32
Expects a Uint8Array within the range of signed 32-bit integers and returns first varint parsed

## makeInput
Takes a nubmer, coverts it to base 128 and then an array that can be used for input into above functions for testing

## Notes
- Each method currently returns only the first varint and will disregard all bytes in the input after
- Error handling of invalid inputs is omitted in order to focus on performance benchmarking of each approach
- parse32 clocks significantly faster than parseBIG, but as of yet I'm unable to verify whether this is due soley to parseBIG's need 
to use BigInts and parse32 being faster (yet still accurate) for any values in javascript's safe number range for the mantissa (-2^53 to 2^53 -1) 
or whether restricting to values in the smi range (-2^31 to 2^31 - 1) would actually result in a significant speedup in v8
